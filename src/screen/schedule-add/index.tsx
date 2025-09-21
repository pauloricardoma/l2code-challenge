import DateModalIOs from "@/src/components/DateModalIOs";
import Header from "@/src/components/Header";
import IconButton from "@/src/components/IconButton";
import OptionsIOsModal from "@/src/components/OptionsIOsModal";
import TextInputButton from "@/src/components/TextInputButton";
import ThemedButton from "@/src/components/ThemedButton";
import ThemeTextInput from "@/src/components/ThemeTextInput";
import {
  formatLocalDate,
  formatLocalDateWithTime,
  formatLocalTime
} from "@/src/utils/format-date";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useScheduleAdd from "./useScheduleAdd";

function ScheduleAddView() {
  const {
    id,
    movieTitle,
    calendars,
    showDateModal,
    showCalendarModal,
    date,
    isChecked,
    calendarId,
    androidDate,
    androidTime,
    goBack,
    handleCreateSchedule,
    setShowDateModal,
    setShowCalendarModal,
    setDate,
    setIsChecked,
    setCalendarId,
    openAndroidPicker,
  } = useScheduleAdd();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={id ? "Editar Agendamento" : "Adicionar Agendamento"}
        goBack={goBack}
      />

      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.label}>Título:</Text>
          <ThemeTextInput
            editable={false}
            placeholder="Título do filme"
            value={movieTitle as string}
          />
        </View>
        {Platform.OS === 'ios' ? (
          <View style={styles.formItem}>
            <Text style={styles.label}>Data:</Text>
            <TextInputButton
              placeholder="Data do agendamento"
              value={formatLocalDateWithTime(date)}
              onPress={() => setShowDateModal(true)}
            />
          </View>
        ) : (
          <>
            <View style={styles.formItem}>
              <Text style={styles.label}>Data:</Text>
              <TextInputButton
                placeholder="Data do agendamento"
                value={formatLocalDate(androidDate)}
                onPress={() => openAndroidPicker('date')}
              />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.label}>Hora:</Text>
              <TextInputButton
                placeholder="Hora do agendamento"
                value={formatLocalTime(androidTime)}
                onPress={() => openAndroidPicker('time')}
              />
            </View>
          </>
        )}
        <View style={styles.checkboxItem}>
          <IconButton
            icon={isChecked
              ? <FontAwesome name="circle" size={24} color="#FF8C00" />
              : <FontAwesome name="circle-o" size={24} color="#FFF" />
            }
            onPress={() => setIsChecked(prev => !prev)}
          />
          <Text style={styles.label}>Adicionar a agenda</Text>
        </View>
        <ThemedButton
          type="primary"
          text={id ? "Atualizar Agendamento" : "Adicionar Agendamento"}
          onPress={handleCreateSchedule}
        />
      </View>

      {showDateModal && (
        <DateModalIOs
          visible={showDateModal}
          value={date}
          onChange={(date) => setDate(date)}
          onClose={() => setShowDateModal(false)}
        />
      )}
      {showCalendarModal && (
        <>
          {Platform.OS === 'ios' && (
            <OptionsIOsModal
              visible={showCalendarModal}
              value={calendarId}
              onChange={(calendarId) => setCalendarId(calendarId as string)}
              options={calendars.map((calendar) => ({
                label: calendar.title,
                value: calendar.id,
              }))}
              placeholder="Selecione um calendário"
              onClose={() => setShowCalendarModal(false)}
            />
          )}
        </>
      )}
    </SafeAreaView>
  )
}

export default ScheduleAddView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  form: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  formItem: {
    gap: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFF",
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
})
