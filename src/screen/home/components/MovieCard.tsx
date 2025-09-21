import IconButton from "@/src/components/IconButton";
import IconLink from "@/src/components/IconLink";
import { BASE_URLS } from "@/src/constants/base-urls";
import { useQueryCreateMovieSettings, useQueryUpdateMovieSettings } from "@/src/hooks/useQueryMoviesSettings";
import { MovieSchedules } from "@/src/types/movie-schedules.model";
import { MovieSettings } from "@/src/types/movie-settings.model";
import { formatDate } from "@/src/utils/format-date";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { Image, StyleSheet, Text, View } from "react-native";
import { Movie } from "../../../types/movie.model";

type MovieCardProps = {
  item: Movie
  settings: MovieSettings | null
  schedules: MovieSchedules | null
}

function MovieCard({ item, settings, schedules }: MovieCardProps) {
  const { createMovieSettings } = useQueryCreateMovieSettings();
  const { updateMovieSettings } = useQueryUpdateMovieSettings();

  const toggleSettingsPress = (is_watched: boolean) => {
    if (settings) {
      updateMovieSettings({
        id: settings.id,
        watched: is_watched ? !settings.watched : settings.watched,
        is_wish: !is_watched ? !settings.is_wish : settings.is_wish,
      });
    } else {
      createMovieSettings({
        movie_id: item.id,
        watched: is_watched ? true : false,
        is_wish: !is_watched ? true : false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${BASE_URLS.TMDB_IMG}${item.poster_path || item.backdrop_path}` }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
              {item.title}
            </Text>
            <View style={styles.titleRowActions}>
              <IconButton
                icon={
                  <AntDesign
                    name="heart"
                    size={16}
                    color={settings?.is_wish ? "#D32F2F" : "#FFF"}
                  />
                }
                onPress={() => toggleSettingsPress(false)}
              />
              <IconButton
                icon={
                  <Octicons
                    name={settings?.watched ? "eye" : "eye-closed"}
                    size={16}
                    color={settings?.watched ? "#FF8C00" : "#FFF"}
                  />
                }
                onPress={() => toggleSettingsPress(true)}
              />
              <IconLink
                path={`schedule-add`}
                params={{
                  id: schedules?.id || null,
                  movieId: item.id,
                  movieTitle: item.title,
                }}
                icon={
                  <FontAwesome
                    name={schedules ? "calendar-check-o" : "calendar-plus-o"}
                    size={16}
                    color={schedules ? "#FF8C00" : "#FFF"}
                  />
                }
              />
            </View>
          </View>
          <Text style={styles.overview} numberOfLines={3} ellipsizeMode="tail">
            {item.overview}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItemDate}>
            <Text style={[styles.text, styles.label]}>Data de lançamento</Text>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {formatDate(item.release_date)}
            </Text>
          </View>
          <View style={styles.infoItemRating}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {item.vote_average}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#FF8C00",
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 160,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
  },
  titleContainer: {
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleRowActions: {
    flexDirection: 'row',
    gap: 6,
  },
  title: {
    width: '50%',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700',
    color: "#FF8C00"
  },
  overview: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: "#FFF"
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItemDate: {
    gap: 4,
  },
  infoItemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: '400',
    color: "#FFF"
  },
  label: {
    fontWeight: '700',
    color: "#FFF"
  }
})
