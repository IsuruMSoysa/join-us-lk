type AppFooterProps = {
  coupleNames: {
    first: string;
    second: string;
  };
};

export function AppFooter({ coupleNames }: AppFooterProps) {
  return (
    <footer className="py-6 text-center text-coffee/60 font-round text-sm">
      <p>
        © 2026 {coupleNames.first} & {coupleNames.second}
      </p>
    </footer>
  );
}
