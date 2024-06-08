import { useState, useRef } from 'react'

import { DotButtonType } from "../../@types";
import { DotButton, Text } from "../";

export type ImageCardType = 'photo' | 'edit';

export interface ImageCardProps {
	type?: ImageCardType;
	onOpenExplorer?(photo: string): void;
}

export function ImageCard(props: ImageCardProps) {
	const { type = 'photo', onOpenExplorer } = props

	const [image, setImage] = useState<string>('')
	
	const inputRef = useRef<HTMLInputElement>(null);

	const imageCardTitles: Record<Required<ImageCardProps>['type'], string> = {
		edit: 'Imagem adicionada! Clique para editar',
		photo: 'Escolha uma imagem de divulgação'
	}

	const imageCardTypes: Record<Required<ImageCardProps>['type'], DotButtonType> = {
		edit: 'pencil',
		photo: 'add'
	}

	// TODO: Get image from user library
	function handleUploadImage(): void {
		if (inputRef.current) {
			inputRef.current.click();

			const files = inputRef.current.files
			if (files) {
				const [imageSelected] = files;
	
				console.log(imageSelected)
			}


			if (onOpenExplorer) onOpenExplorer('')
		}
	}

	return (
		<>
			<input type='file' accept='image/png, image/jpg, image/jpeg' multiple={false} ref={inputRef} className='hidden' />

			<button onClick={handleUploadImage} className="flex flew-row w-96 h-[4.5rem] justify-center items-center px-5 gap-2 bg-white ring-1 ring-primary rounded-lg cursor-pointer hover:opacity-90 transition-colors duration-300">
				<DotButton type={imageCardTypes[type]} isChild />

				<Text type="semibold" color="primary" toCenter isCursorPointer>{imageCardTitles[type]}</Text>
			</button>
		</>
	)
}