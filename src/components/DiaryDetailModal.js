import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { MOODS, TOKENS } from '../theme/tokens';

export default function DiaryDetailModal({
  entry,
  visible,
  onClose,
  liked,
  onLikePress,
}) {
  if (!entry) {
    return null;
  }

  const mood = MOODS.find((item) => item.name === entry.mood);

  return (
    <Modal
      accessibilityViewIsModal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tutup detail cerita"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <View
          accessibilityViewIsModal
          style={styles.sheet}
          accessibilityLabel={`Detail cerita: ${entry.title}`}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetEyebrow}>CATATAN DIARIMU</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tutup detail cerita"
              hitSlop={4}
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
          {entry.image ? (
            <Image
              accessibilityLabel="Ilustrasi suasana pagi yang cerah"
              source={entry.image}
              style={styles.image}
            />
          ) : (
            <View style={[styles.moodIllustration, { backgroundColor: mood.background }]}>
              <Text style={styles.moodIllustrationEmoji}>{mood.emoji}</Text>
            </View>
          )}
          <View style={styles.entryMeta}>
            <Text style={styles.date}>{entry.date}</Text>
            <View style={[styles.moodTag, { backgroundColor: mood.background }]}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={[styles.moodText, { color: mood.color }]}>{entry.mood}</Text>
            </View>
          </View>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.excerpt}>{entry.excerpt}</Text>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Terima kasih sudah menyimpan momen ini.</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={liked ? 'Batalkan suka cerita ini' : 'Sukai cerita ini'}
              accessibilityState={{ selected: liked }}
              onPress={onLikePress}
              style={styles.likeButton}
            >
              <Text style={[styles.heart, liked && styles.likedHeart]}>
                {liked ? '♥' : '♡'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: TOKENS.color.overlay,
    paddingHorizontal: TOKENS.space.medium,
    paddingBottom: TOKENS.space.medium,
  },
  sheet: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    borderRadius: TOKENS.radius.xlarge,
    backgroundColor: TOKENS.color.surface,
    padding: TOKENS.space.xlarge,
  },
  sheetHeader: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetEyebrow: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.caption,
    fontWeight: '700',
    letterSpacing: 1.1,
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
  image: {
    width: '100%',
    height: 170,
    borderRadius: TOKENS.radius.large,
    marginBottom: TOKENS.space.large,
  },
  moodIllustration: {
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radius.large,
    marginBottom: TOKENS.space.large,
  },
  moodIllustrationEmoji: {
    fontSize: 42,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: TOKENS.space.medium,
  },
  date: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.caption,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  moodTag: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: TOKENS.space.xsmall,
    paddingHorizontal: TOKENS.space.medium,
    borderRadius: TOKENS.radius.round,
  },
  moodEmoji: {
    fontSize: TOKENS.text.small,
  },
  moodText: {
    fontSize: TOKENS.text.caption,
    fontWeight: '700',
  },
  title: {
    color: TOKENS.color.ink,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
  },
  excerpt: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.body,
    lineHeight: 23,
    marginTop: TOKENS.space.small,
  },
  footer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: TOKENS.color.line,
    marginTop: TOKENS.space.xlarge,
    paddingTop: TOKENS.space.small,
  },
  footerText: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.small,
  },
  heart: {
    color: TOKENS.color.body,
    fontSize: 24,
  },
  likedHeart: {
    color: TOKENS.color.heart,
  },
  likeButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radius.round,
    backgroundColor: TOKENS.color.greenLight,
  },
});
