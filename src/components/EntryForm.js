import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MOODS, TOKENS } from '../theme/tokens';

export default function EntryForm({ visible, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [mood, setMood] = useState(MOODS[0].name);
  const canSubmit = title.trim().length > 0 && excerpt.trim().length > 0;

  const saveEntry = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      date: `Hari ini · ${new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      mood,
      title: title.trim(),
      excerpt: excerpt.trim(),
    });
    setTitle('');
    setExcerpt('');
    setMood(MOODS[0].name);
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tutup form cerita"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.sheetContainer}
        >
          <View style={styles.sheet}>
            <View style={styles.header}>
              <View style={styles.headerCopy}>
                <Text style={styles.eyebrow}>CERITA BARU</Text>
                <Text style={styles.title}>Apa yang ingin kamu simpan?</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Tutup form cerita"
                onPress={onClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.fieldLabel}>Judul cerita</Text>
            <TextInput
              accessibilityLabel="Judul cerita"
              maxLength={70}
              onChangeText={setTitle}
              placeholder="Contoh: Sore yang menyenangkan"
              placeholderTextColor={TOKENS.color.muted}
              style={styles.titleInput}
              value={title}
            />

            <Text style={styles.fieldLabel}>Ceritakan sedikit</Text>
            <TextInput
              accessibilityLabel="Isi cerita"
              multiline
              maxLength={240}
              onChangeText={setExcerpt}
              placeholder="Tuliskan momen kecil yang ingin kamu ingat..."
              placeholderTextColor={TOKENS.color.muted}
              style={styles.excerptInput}
              textAlignVertical="top"
              value={excerpt}
            />

            <Text style={styles.fieldLabel}>Bagaimana suasana hatimu?</Text>
            <View style={styles.moodList}>
              {MOODS.map((item) => {
                const selected = mood === item.name;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Pilih mood ${item.name}`}
                    accessibilityState={{ selected }}
                    key={item.name}
                    onPress={() => setMood(item.name)}
                    style={[
                      styles.moodChip,
                      selected && {
                        backgroundColor: item.background,
                        borderColor: item.color,
                      },
                    ]}
                  >
                    <Text style={styles.moodEmoji}>{item.emoji}</Text>
                    <Text style={[styles.moodText, selected && { color: item.color }]}>
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Simpan cerita"
              accessibilityState={{ disabled: !canSubmit }}
              disabled={!canSubmit}
              onPress={saveEntry}
              style={[styles.submitButton, !canSubmit && styles.submitDisabled]}
            >
              <Text style={styles.submitText}>Simpan cerita</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: TOKENS.color.overlay,
  },
  sheetContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    borderTopLeftRadius: TOKENS.radius.xlarge,
    borderTopRightRadius: TOKENS.radius.xlarge,
    backgroundColor: TOKENS.color.surface,
    paddingHorizontal: TOKENS.space.xlarge,
    paddingTop: TOKENS.space.xlarge,
    paddingBottom: TOKENS.space.xxlarge,
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: TOKENS.space.small,
    marginBottom: TOKENS.space.large,
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.caption,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.title,
    fontWeight: '700',
    marginTop: TOKENS.space.xsmall,
  },
  closeButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radius.round,
    backgroundColor: TOKENS.color.page,
  },
  closeText: {
    color: TOKENS.color.ink,
    fontSize: 29,
    lineHeight: 32,
  },
  fieldLabel: {
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.small,
    fontWeight: '700',
    marginBottom: TOKENS.space.small,
    marginTop: TOKENS.space.small,
  },
  titleInput: {
    minHeight: 48,
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.body,
    borderWidth: 1,
    borderColor: TOKENS.color.line,
    borderRadius: TOKENS.radius.medium,
    backgroundColor: TOKENS.color.page,
    paddingHorizontal: TOKENS.space.medium,
  },
  excerptInput: {
    minHeight: 88,
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.body,
    borderWidth: 1,
    borderColor: TOKENS.color.line,
    borderRadius: TOKENS.radius.medium,
    backgroundColor: TOKENS.color.page,
    paddingHorizontal: TOKENS.space.medium,
    paddingTop: TOKENS.space.medium,
  },
  moodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TOKENS.space.small,
  },
  moodChip: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: TOKENS.space.xsmall,
    paddingHorizontal: TOKENS.space.medium,
    borderWidth: 1,
    borderColor: TOKENS.color.line,
    borderRadius: TOKENS.radius.round,
  },
  moodEmoji: {
    fontSize: TOKENS.text.body,
  },
  moodText: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.small,
    fontWeight: '600',
  },
  submitButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radius.medium,
    backgroundColor: TOKENS.color.green,
    marginTop: TOKENS.space.xlarge,
  },
  submitDisabled: {
    opacity: 0.45,
  },
  submitText: {
    color: TOKENS.color.white,
    fontSize: TOKENS.text.body,
    fontWeight: '700',
  },
});
