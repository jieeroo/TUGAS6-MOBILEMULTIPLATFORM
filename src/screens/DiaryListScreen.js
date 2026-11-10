import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import EntryForm from '../components/EntryForm';
import SearchBar from '../components/SearchBar';
import { diaryEntries as initialEntries } from '../data/diaryEntries';
import useDiarySearch from '../hooks/useDiarySearch';
import useLikedEntries from '../hooks/useLikedEntries';
import { MOODS, TOKENS } from '../theme/tokens';

function MoodFilter({ mood, selected, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Filter mood ${mood ? mood.name : 'semua cerita'}`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.moodChip,
        selected && {
          backgroundColor: mood ? mood.background : TOKENS.color.greenLight,
          borderColor: mood ? mood.color : TOKENS.color.green,
        },
      ]}
    >
      <Text style={styles.moodChipEmoji}>{mood ? mood.emoji : '✦'}</Text>
      <Text style={[styles.moodChipText, selected && styles.moodChipTextSelected]}>
        {mood ? mood.name : 'Semua'}
      </Text>
    </Pressable>
  );
}

function DiaryListHeader({
  selectedMood,
  setSelectedMood,
  onAddPress,
  onSearchChange,
  searchResetKey,
  activeTab,
  onResetFilters,
}) {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>✳</Text>
          </View>
          <Text style={styles.brandName}>ruang cerita</Text>
        </View>
        <Image
          accessibilityLabel="Avatar pengguna"
          source={require('../../assets/people/avatar.png')}
          style={styles.avatar}
        />
      </View>

      <View style={styles.welcome}>
        <Text style={styles.eyebrow}>SELASA, 10 NOVEMBER 2026</Text>
        <Text style={styles.greeting}>Halo, Ghaiyyas <Text>✦</Text></Text>
        <Text style={styles.intro}>
          Simpan momen kecil yang berarti.{'\n'}Satu halaman untuk dirimu sendiri.
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryLabel}>CERITAMU BULAN INI</Text>
          <Text style={styles.summaryTitle}>Setiap hari punya cerita.</Text>
          <Text style={styles.summaryCaption}>
            Kamu sudah menulis cerita yang berharga
          </Text>
        </View>
        <View style={styles.summaryIllustration}>
          <Text style={styles.summarySun}>☼</Text>
          <Text style={styles.summaryFlower}>✿</Text>
        </View>
      </View>

      {activeTab === 'Home' && (
        <View style={styles.moodSection}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Jelajahi suasana</Text>
              <Text style={styles.sectionSubtitle}>Pilih mood untuk melihat ceritamu</Text>
            </View>
            <Text style={styles.tinySparkle}>✳</Text>
          </View>
          <FlatList
            data={[{ name: 'Semua', emoji: '✦' }, ...MOODS]}
            horizontal
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.moodList}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isAll = item.name === 'Semua';
              return (
                <MoodFilter
                  mood={isAll ? null : item}
                  selected={selectedMood === item.name}
                  onPress={() => setSelectedMood(item.name)}
                />
              );
            }}
          />
        </View>
      )}

      <View style={styles.entriesHeading}>
        <View style={styles.entriesHeadingCopy}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'Home' ? 'Cerita terakhirmu' : 'Cerita favoritmu'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {activeTab === 'Home'
              ? 'Ketuk cerita untuk membaca lebih lanjut'
              : 'Kumpulan cerita yang kamu sukai'}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tulis cerita baru"
          onPress={onAddPress}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>＋ Tulis</Text>
        </Pressable>
      </View>
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <SearchBar key={searchResetKey} onChange={onSearchChange} />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reset filter dan pencarian"
          onPress={onResetFilters}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Reset Filter</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const columns = width >= TOKENS.breakpoint.tablet ? 2 : 1;
  const [entries, setEntries] = useState(initialEntries);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [selectedMood, setSelectedMood] = useState('Semua');
  const [activeTab, setActiveTab] = useState('Home');
  const [searchResetKey, setSearchResetKey] = useState(0);
  const [formVisible, setFormVisible] = useState(false);
  const likedEntries = useLikedEntries(entries, likedIds);
  const sourceEntries = activeTab === 'Home' ? entries : likedEntries;
  const visibleEntries = useDiarySearch(
    sourceEntries,
    query,
    activeTab === 'Home' ? selectedMood : 'Semua',
  );

  const addEntry = (draft) => {
    const entry = {
      ...draft,
      id: `entry-${Date.now()}-${entries.length + 1}`,
    };
    setEntries((currentEntries) => [entry, ...currentEntries]);
    setSelectedMood('Semua');
    setActiveTab('Home');
    setFormVisible(false);
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedMood('Semua');
    setSearchResetKey((currentKey) => currentKey + 1);
  };

  const toggleLike = (entryId) => {
    setLikedIds((currentIds) => {
      const nextIds = new Set(currentIds);
      if (nextIds.has(entryId)) {
        nextIds.delete(entryId);
      } else {
        nextIds.add(entryId);
      }
      return nextIds;
    });
  };

  const listHeader = (
    <DiaryListHeader
      selectedMood={selectedMood}
      setSelectedMood={setSelectedMood}
      onAddPress={() => setFormVisible(true)}
      onSearchChange={setQuery}
      searchResetKey={searchResetKey}
      activeTab={activeTab}
      onResetFilters={resetFilters}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        key={`diary-list-${columns}`}
        data={visibleEntries}
        keyExtractor={(entry) => entry.id}
        numColumns={columns}
        columnWrapperStyle={columns === 2 ? styles.gridRow : undefined}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <Text style={styles.emptyState}>
            {activeTab === 'Favorites' && likedEntries.length === 0
              ? 'Belum ada cerita favorit. Sukai cerita dari Home untuk menyimpannya.'
              : 'Tidak ada cerita yang cocok. Coba kata kunci atau mood lain.'}
          </Text>
        }
        ListFooterComponent={
          <Text style={styles.endNote}>Dibuat dengan hati, untuk dirimu sendiri ♡</Text>
        }
        extraData={likedIds}
        renderItem={({ item }) => (
          <DiaryCard
            entry={item}
            isGrid={columns === 2}
            liked={likedIds.has(item.id)}
            onLikePress={() => toggleLike(item.id)}
            onPress={() => setSelected(item)}
          />
        )}
      />
      <View style={styles.bottomBar}>
        <Pressable
          accessibilityRole="tab"
          accessibilityLabel="Home, semua cerita"
          accessibilityState={{ selected: activeTab === 'Home' }}
          onPress={() => setActiveTab('Home')}
          style={[styles.tabButton, activeTab === 'Home' && styles.activeTabButton]}
        >
          <Text style={[styles.tabIcon, activeTab === 'Home' && styles.activeTabText]}>▤</Text>
          <Text style={[styles.tabLabel, activeTab === 'Home' && styles.activeTabText]}>
            Home
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="tab"
          accessibilityLabel={`Favorites, ${likedEntries.length} cerita disukai`}
          accessibilityState={{ selected: activeTab === 'Favorites' }}
          onPress={() => setActiveTab('Favorites')}
          style={[styles.tabButton, activeTab === 'Favorites' && styles.activeTabButton]}
        >
          <Text style={[styles.tabIcon, activeTab === 'Favorites' && styles.activeTabText]}>
            ♥
          </Text>
          <Text style={[styles.tabLabel, activeTab === 'Favorites' && styles.activeTabText]}>
            Favorites ({likedEntries.length})
          </Text>
        </Pressable>
      </View>
      <DiaryDetailModal
        entry={selected}
        liked={selected ? likedIds.has(selected.id) : false}
        onLikePress={() => selected && toggleLike(selected.id)}
        visible={selected !== null}
        onClose={() => setSelected(null)}
      />
      <EntryForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={addEntry}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TOKENS.color.page,
  },
  listContent: {
    paddingHorizontal: TOKENS.space.page,
    paddingTop: TOKENS.space.small,
    paddingBottom: TOKENS.space.large,
    width: '100%',
    maxWidth: 980,
    alignSelf: 'center',
  },
  gridRow: {
    gap: TOKENS.space.medium,
    alignItems: 'stretch',
  },
  header: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TOKENS.space.small,
  },
  brandMark: {
    width: 34,
    height: 34,
    borderRadius: TOKENS.radius.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: TOKENS.color.green,
  },
  brandMarkText: {
    color: TOKENS.color.cream,
    fontSize: 22,
    lineHeight: 25,
  },
  brandName: {
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.body,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: TOKENS.radius.round,
    borderWidth: 2,
    borderColor: TOKENS.color.surface,
  },
  welcome: {
    marginTop: TOKENS.space.section,
  },
  eyebrow: {
    color: TOKENS.color.muted,
    fontSize: TOKENS.text.caption,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  greeting: {
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.heading,
    fontWeight: '700',
    letterSpacing: -1,
    marginTop: TOKENS.space.small,
  },
  intro: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.body,
    lineHeight: 21,
    marginTop: TOKENS.space.xsmall,
  },
  summaryCard: {
    minHeight: 132,
    backgroundColor: TOKENS.color.greenLight,
    borderRadius: TOKENS.radius.xlarge,
    marginTop: TOKENS.space.xlarge,
    paddingHorizontal: TOKENS.space.large,
    paddingVertical: TOKENS.space.large,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  summaryCopy: {
    flex: 1,
    zIndex: 1,
  },
  summaryLabel: {
    color: TOKENS.color.muted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  summaryTitle: {
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.title,
    lineHeight: 22,
    fontWeight: '700',
    marginTop: TOKENS.space.xsmall,
  },
  summaryCaption: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.caption,
    marginTop: TOKENS.space.xsmall,
  },
  summaryIllustration: {
    width: 92,
    height: 92,
    marginLeft: TOKENS.space.xsmall,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radius.round,
    backgroundColor: TOKENS.color.greenSoft,
  },
  summarySun: {
    color: TOKENS.color.gold,
    fontSize: 56,
    lineHeight: 66,
    position: 'absolute',
    top: TOKENS.space.xsmall,
    right: TOKENS.space.xsmall,
  },
  summaryFlower: {
    color: TOKENS.color.sage,
    fontSize: 57,
    lineHeight: 64,
    position: 'absolute',
    bottom: -TOKENS.space.xsmall,
    left: TOKENS.space.xsmall,
  },
  moodSection: {
    marginTop: TOKENS.space.section,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.title,
    fontWeight: '700',
    letterSpacing: -0.25,
  },
  sectionSubtitle: {
    color: TOKENS.color.muted,
    fontSize: TOKENS.text.caption,
    marginTop: TOKENS.space.xsmall,
  },
  tinySparkle: {
    color: TOKENS.color.gold,
    fontSize: 22,
  },
  moodList: {
    gap: TOKENS.space.small,
    paddingTop: TOKENS.space.medium,
    paddingBottom: TOKENS.space.xsmall,
  },
  moodChip: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: TOKENS.space.small,
    borderRadius: TOKENS.radius.round,
    borderWidth: 1,
    borderColor: TOKENS.color.line,
    paddingHorizontal: TOKENS.space.medium,
    backgroundColor: TOKENS.color.surface,
  },
  moodChipEmoji: {
    fontSize: TOKENS.text.body,
  },
  moodChipText: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.small,
    fontWeight: '600',
  },
  moodChipTextSelected: {
    color: TOKENS.color.ink,
  },
  entriesHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: TOKENS.space.small,
    marginTop: TOKENS.space.section,
    marginBottom: TOKENS.space.medium,
  },
  entriesHeadingCopy: {
    flex: 1,
  },
  addButton: {
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: TOKENS.radius.round,
    backgroundColor: TOKENS.color.green,
    paddingHorizontal: TOKENS.space.medium,
  },
  addButtonText: {
    color: TOKENS.color.white,
    fontSize: TOKENS.text.small,
    fontWeight: '700',
  },
  emptyState: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.body,
    paddingVertical: TOKENS.space.xxlarge,
    textAlign: 'center',
  },
  endNote: {
    color: TOKENS.color.muted,
    fontSize: TOKENS.text.caption,
    textAlign: 'center',
    marginTop: TOKENS.space.small,
    marginBottom: TOKENS.space.medium,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TOKENS.space.small,
  },
  searchInput: {
    flex: 1,
  },
  resetButton: {
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: TOKENS.radius.medium,
    backgroundColor: TOKENS.color.greenLight,
    marginTop: TOKENS.space.large,
    gap: TOKENS.space.small,
    paddingHorizontal: TOKENS.space.small,
  },
  resetButtonText: {
    color: TOKENS.color.green,
    fontSize: TOKENS.text.caption,
    fontWeight: '700',
  },
  bottomBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: TOKENS.space.small,
    borderTopWidth: 1,
    borderTopColor: TOKENS.color.line,
    backgroundColor: TOKENS.color.surface,
    paddingHorizontal: TOKENS.space.xlarge,
  },
  tabButton: {
    flex: 1,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: TOKENS.space.small,
    borderRadius: TOKENS.radius.medium,
  },
  activeTabButton: {
    backgroundColor: TOKENS.color.greenLight,
  },
  tabIcon: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.title,
  },
  tabLabel: {
    color: TOKENS.color.body,
    fontSize: TOKENS.text.small,
    fontWeight: '600',
  },
  activeTabText: {
    color: TOKENS.color.green,
    fontWeight: '700',
  },
});
