import IconButton from "@/src/components/IconButton";
import IconLink from "@/src/components/IconLink";
import { MovieSchedules } from "@/src/types/movie-schedules.model";
import { formatLocalDateWithTime } from "@/src/utils/format-date";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from "react-native";

type SchedulesCardProps = {
  item: MovieSchedules
  onDelete: (item: MovieSchedules) => void
}

function SchedulesCard({ item, onDelete }: SchedulesCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.movie_title}
        </Text>
        <Text style={styles.date}>
          {formatLocalDateWithTime(new Date(item.date))}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <IconLink
          path={`schedule-add`}
          params={{
            id: item.id,
            movieId: item.movie_id,
            movieTitle: item.movie_title,
          }}
          icon={
            <AntDesign
              name="edit"
              size={16}
              color="#FFF"
            />
          }
        />
        <IconButton
          icon={
            <FontAwesome
              name="trash-o"
              size={16}
              color="#D32F2F"
            />
          }
          onPress={() => onDelete(item)}
        />
      </View>
    </View>
  )
}

export default SchedulesCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "#FF8C00",
    borderRadius: 4,
    overflow: 'hidden',
    padding: 12,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  titleContainer: {
    flex: 1,
    gap: 6,
  },
  title: {
    width: '90%',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '700',
    color: "#FF8C00"
  },
  date: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    color: "#FFF"
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
})
