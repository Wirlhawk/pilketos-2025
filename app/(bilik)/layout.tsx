import Image from "next/image";

export default function BilikLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // return <div className="neo bg-background text-foreground min-h-screen">{children}</div>;

    return (
        <div className="min-h-screen w-full bg-background overflow-hidden neo text-foreground relative">
            <Image
                src="/assets/polkadot-1.png"
                alt=""
                className="absolute  z-0"
                fill
            />
            <Image
                src="/assets/polkadot-2.png"
                alt=""
                className="absolute  z-0"
                fill
            />
            <Image
                src="/assets/red-2.png"
                alt=""
                width={200}
                height={200}
                className="absolute top-0 left-0 -translate-x-1/3 z-0"
            />
            <Image
                src="/assets/blue-2.png"
                alt=""
                width={200}
                height={200}
                className="absolute bottom-0 left-0 -translate-x-1/3 z-0"
            />
            <Image
                src="/assets/red-1.png"
                alt=""
                width={200}
                height={200}
                className="absolute top-0 right-0 translate-x-1/3 z-0"
            />
            <Image
                src="/assets/blue-1.png"
                alt=""
                width={200}
                height={200}
                className="absolute bottom-0 right-0 translate-x-1/3 z-0"
            />
            {children}
        </div>
    );
}
