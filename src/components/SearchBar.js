import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { TOKENS } from '../theme/tokens';

export default function SearchBar({ onChange }) {
  const [value, setValue] = useState('');

  const updateValue = (text) => {
    setValue(text);
    onChange(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>⌕</Text>
      <TextInput
        accessibilityLabel="Cari cerita diary"
        autoCapitalize="none"
        onChangeText={updateValue}
        placeholder="Cari cerita atau suasana..."
        placeholderTextColor={TOKENS.color.muted}
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
      {value.length > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Hapus pencarian"
          hitSlop={8}
          onPress={() => updateValue('')}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: TOKENS.color.line,
    borderRadius: TOKENS.radius.medium,
    backgroundColor: TOKENS.color.surface,
    paddingHorizontal: TOKENS.space.medium,
    marginTop: TOKENS.space.large,
  },
  searchIcon: {
    color: TOKENS.color.body,
    fontSize: 24,
    marginRight: TOKENS.space.small,
  },
  input: {
    flex: 1,
    minHeight: 48,
    color: TOKENS.color.ink,
    fontSize: TOKENS.text.body,
    paddingVertical: TOKENS.space.small,
  },
  clearButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radius.round,
    backgroundColor: TOKENS.color.page,
  },
  clearText: {
    color: TOKENS.color.ink,
    fontSize: 22,
  },
});
