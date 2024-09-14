import { ChangeDetector } from "../../app/driver-ports/change-detector";

const createInMemoryChangeDetector = (): ChangeDetector => {
  return {
    detectChanges() {
      // Do nothing as this is an in-memory implementation
    },
    markForCheck() {
      // Do nothing as this is an in-memory implementation
    },
    detach() {
      // Do nothing as this is an in-memory implementation
    },
  };
};

export { createInMemoryChangeDetector };
