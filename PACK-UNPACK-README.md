# File Packer/Unpacker

Narzędzie do scalania katalogów w pojedyncze pliki JSON i odtwarzania ich z powrotem do oryginalnej struktury.

## Użycie

### Taski npm

```bash
# Spakuj katalog src/ do pliku src.packed.json
npm run pack

# Rozpakuj plik src.packed.json do katalogu src-unpacked/
npm run unpack
```

### Bezpośrednie użycie skryptu

```bash
# Spakuj katalog
node scripts/pack-unpack.js pack <źródłowy-katalog> <plik-wyjściowy>

# Rozpakuj plik
node scripts/pack-unpack.js unpack <plik-wejściowy> <katalog-docelowy>
```

### Przykłady

```bash
# Spakuj katalog src/
node scripts/pack-unpack.js pack src/ backup.json

# Rozpakuj do nowego katalogu
node scripts/pack-unpack.js unpack backup.json src-restored/

# Spakuj cały projekt (oprócz node_modules)
node scripts/pack-unpack.js pack . project-backup.json
```

## Jak to działa

### Format pliku

Spakowany plik to JSON zawierający:

- `version`: Wersja formatu (aktualnie "1.0.0")
- `timestamp`: Data i czas utworzenia pakietu
- `files`: Tablica plików z:
  - `path`: Względna ścieżka pliku
  - `content`: Zawartość pliku (base64 dla plików binarnych, UTF-8 dla tekstowych)
  - `isBinary`: Czy plik jest binarny

### Obsługa plików

- **Pliki tekstowe**: Przechowywane jako string UTF-8
- **Pliki binarne**: Przechowywane jako base64
- **Wykrywanie binarnych**: Na podstawie obecności bajtów null w pierwszych 512 bajtach

### Przywracanie struktury

Podczas rozpakowywania:

1. Odtwarzane są wszystkie katalogi
2. Pliki są tworzone z oryginalną zawartością
3. Zachowywane są dokładne ścieżki względne

## Zastosowania

- **Backup kodu źródłowego** przed większymi zmianami
- **Archiwizacja projektu** w pojedynczym pliku
- **Przesyłanie kodu** jako pojedynczy plik
- **Przywracanie** z backupu z gwarancją identyczności

## Przykład użycia w CI/CD

```yaml
# GitHub Actions - backup przed deploymentem
- name: Backup source code
  run: npm run pack

- name: Deploy
  run: # ... deployment steps ...

- name: Restore on failure
  if: failure()
  run: npm run unpack
```
