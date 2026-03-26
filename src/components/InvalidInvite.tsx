type InvalidInviteProps = {
  firstName: string;
  secondName: string;
};

export function InvalidInvite({ firstName, secondName }: InvalidInviteProps) {
  return (
    <div className="bg-cream text-coffee font-sans min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg w-full glass p-10 rounded-[3rem] border-maroon/10 text-center">
        <h1 className="font-round text-3xl md:text-4xl text-maroon font-bold mb-4">
          Invalid Invitation Link
        </h1>
        <p className="font-round text-coffee/70 mb-6">
          The link you used doesn&apos;t match any of the invitation URLs we
          have on record.
        </p>
        <p className="font-round text-sm text-coffee/60 mb-8">
          If you believe this is a mistake, please reach out to{" "}
          <span className="font-semibold">
            {firstName} &amp; {secondName}
          </span>{" "}
          to get the correct invitation link.
        </p>
        <p className="font-handwritten text-xl text-maroon">
          With love, {firstName} &amp; {secondName}
        </p>
      </div>
    </div>
  );
}

