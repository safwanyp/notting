type ChangeDetector = {
  detectChanges(): void;
  markForCheck(): void;
  detach(): void;
};

export { ChangeDetector };
