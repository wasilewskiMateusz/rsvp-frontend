# 📸 Jak dodać zdjęcia?

## Gdzie wrzucić zdjęcia:

```
frontend/src/assets/images/
├── hero-photo.jpg          ← Duże zdjęcie w tle (1920x1080 lub większe)
├── couple-round.jpg        ← Okrągłe zdjęcie pary (800x800)
├── story-photo.jpg         ← Zdjęcie przy historii (1200x800)
└── gallery/
    ├── photo1.jpg
    ├── photo2.jpg
    ├── photo3.jpg
    └── ... (dowolna ilość)
```

## Zalecane rozmiary:

- **hero-photo.jpg**: 1920x1080px (landscape)
- **couple-round.jpg**: 800x800px (kwadrat, będzie okrągłe)
- **story-photo.jpg**: 1200x800px (landscape)
- **gallery/*.jpg**: 1200x800px (landscape)

## Jak aktywować galerię?

Edytuj: `frontend/src/app/components/gallery/gallery.component.ts`

Zmień:
```typescript
photos: string[] = [
  // '/assets/images/gallery/photo1.jpg',
  // '/assets/images/gallery/photo2.jpg',
];
```

Na:
```typescript
photos: string[] = [
  '/assets/images/gallery/photo1.jpg',
  '/assets/images/gallery/photo2.jpg',
  '/assets/images/gallery/photo3.jpg',
  // dodaj wszystkie zdjęcia...
];
```

Zapisz i odśwież stronę!
