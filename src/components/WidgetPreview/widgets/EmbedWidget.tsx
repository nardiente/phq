export const EmbedWidget = ({ config }: { config: WidgetConfig }) => (
  <div className="relative bg-white h-full">
    <WidgetContent config={config} />
    {!config.appearance?.hideCloseButton && (
      <button className="absolute top-4 right-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
); 