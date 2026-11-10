import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MOODS, TOKENS } from '../theme/tokens';

export default function DiaryCard({
  entry,
  isGrid,
  liked,
  onLikePress,
  onPress,
}) {
  const mood = MOODS.find((item) => item.name === entry.mood);

  return (
    <View
      style={[
        styles.card,
        isGrid && styles.gridCard,
        { backgroundColor: mood.background, borderLeftColor: mood.color },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${entry.title}, mood ${entry.mood}`}
        accessibilityHint="Ketuk untuk membaca detail cerita"
        onPress={onPress}
        style={({ pressed }) => [
          styles.detail,
          isGrid && styles.gridDetail,
          pressed && styles.pressed,
        ]}
      >
        {entry.image ? (
          <Image
            accessibilityLabel="Ilustrasi suasana pagi yang cerah"
            source={entry.image}
            style={[styles.image, isGrid && styles.gridImage]}
          />
        ) : (
          <View
            style={[
              styles.decoration,
              { backgroundColor: `${mood.color}20` },
              isGrid && styles.gridDecoration,
            ]}
          >
            <Text style={styles.decorationEmoji}>{mood.emoji}</Text>
          </View>
        )}
        <View style={[styles.content, isGrid && styles.gridContent]}>
          <View style={styles.meta}>
            <Text style={styles.date} numberOfLines={1}>{entry.date}</Text>
            <View style={styles.moodTag}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={[styles.moodText, { color: mood.color }]}>{entry.mood}</Text>
            </View>
          </View>
          <Text style={styles.title} numberOfLines={2}>{entry.title}</Text>
          <Text style={[styles.excerpt, !isGrid && styles.mobileExcerpt]} numberOfLines={isGrid ? 3 : 2}>
            {entry.excerpt}
          </Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={liked ? `Batalkan suka: ${entry.title}` : `Sukai: ${entry.title}`}
        accessibilityState={{ selected: liked }}
        onPress={onLikePress}
        style={[styles.likeButton, isGrid ? styles.gridLikeButton : styles.mobileLikeButton]}
      >
        <Text style={[styles.likeIcon, liked && styles.likedIcon]}>
          {liked ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    minHeight: 128,
    borderLeftWidth: 4,
    borderRadius: TOKENS.radius.large,
    marginBottom: TOKENS.space.medium,
    overflow: 'hidden',
  },
  gridCard: {
    minHeight: 242,
    padding: TOKENS.space.medium,
  },
  detail: {
    flex: 1,
    minWidth: 0,
    minHeight: 128,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: TOKENS.space.medium,
    paddingLeft: TOKENS.space.medium,
    paddingRight: TOKENS.space.small,
  },
  gridDetail: {
    minHeight: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 0,
  },
  pressed: {
    opacity: 0.82,
  },
  image: {
    width: 68,
    height: 72,
    borderRadius: TOKENS.radius.medium,
    marginLeft: TOKENS.space.small,
  },
  gridImage: {
    width: '100%',
    height: 92,
    marginLeft: 0,
    marginBottom: TOKENS.space.small,
  },
  decoration: {
    width: 48,
    height: 48,
    borderRadius: TOKENS.radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: TOKENS.space.small,
  },
  gridDecoration: {
    width: '100%',
    height: 72,
    marginLeft: 0,
    marginBottom: TOKENS.space.small,
  },
  decorationEmoji: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  gridContent: {
    minHeight: 105,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: TOKENS.space.xsmall,
    marginBottom: TOKENS.space.small,
  },
  date: {
    color: TOKENS.color.body,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.35,
    flexShrink: 1,
  },
  moodTag: {
    minHeight: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: TOKENS.space.xsmall,
    paddingHorizontal: TOKENS.space.small,
    paddingVertical: TOKENS.space.xsmall,
    borderRadius: TOKENS.radius.round,
    backgroundColor: TOKENS.color.surface,
  },
  moodEmoji: {
    fontSize: 11,
  },
  moodText: {
    fontSize: 9,
    fontWeight: '700',
  },
  title: {
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.body,
    fontWeight: '700',
    letterSpacing: -0.15,
  },
  excerpt: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.caption,
    lineHeight: 15,
    marginTop: TOKENS.space.xsmall,
  },
  mobileExcerpt: {
    paddingRight: 36,
  },
  likeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radius.round,
    backgroundColor: TOKENS.color.surface,
    zIndex: 1,
  },
  mobileLikeButton: {
    position: 'absolute',
    right: TOKENS.space.xsmall,
    bottom: TOKENS.space.xsmall,
  },
  gridLikeButton: {
    position: 'absolute',
    right: TOKENS.space.small,
    top: TOKENS.space.small,
  },
  likeIcon: {
    color: TOKENS.color.body,
    fontSize: 22,
    lineHeight: 26,
  },
  likedIcon: {
    color: TOKENS.color.heart,
  },
});
