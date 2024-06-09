import { Text, DotButton, Icon } from "../";
import { useRef } from "react";

export function BannerCard(props: BannerCardProps) {
    const { variant = "add", image } = props;

    const bannerCardVariants: Record<BannerCardVariant, JSX.Element> = {
        fill: (
            <div className="flex flex-col items-center justify-center w-64 h-[13.75rem] bg-background-color ring-2 ring-primary overflow-hidden rounded-lg">
                <img alt={`Banner ${image?.name || ""}`} src={image?.uri} className="w-full h-44 object-cover"/>
                <div className="flex flex-row justify-between items-center w-full h-auto p-2">
                    <Icon variant="pencil" size="medium" color="primary" isCursorPointer/>
                    <Icon variant="trash" size="medium" color="primary" isCursorPointer />
                </div>
            </div>
        ),
        empty: (
            <button type="button" className="flex items-center justify-center w-64 h-[13.75rem] bg-background-color ring-2 ring-primary overflow-hidden rounded-lg cursor-pointer hover:opacity-90">
                <DotButton variant="medium" type="add" mode="figure"/>
            </button>
        ),
        add: (
            <button type="button" className="flex flex-col gap-2 items-center justify-center w-64 h-[13.75rem] bg-background-color ring-2 ring-primary overflow-hidden rounded-lg cursor-pointer hover:opacity-90">
                <DotButton variant="medium" type="add" mode="figure"/>

                <Text type="semibold" color="primary" toCenter>Clique para adicionar</Text>
            </button>
        ),
    };

    return bannerCardVariants[variant];
}

export interface BannerCardProps {
    variant?: BannerCardVariant;
    image?: BannerCardImageProps;
}

export interface BannerCardImageProps{
    id: string;
    name: string;
    uri: string;
}

export type BannerCardVariant = "fill" | "empty" | "add"