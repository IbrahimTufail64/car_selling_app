'use client';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';

const AudioElement = ({ setPlayAudio }: { setPlayAudio: any}) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const dataURLToBlob = (dataURL: string) => {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const byteCharacters = atob(parts[1]);
        const byteArrays = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays[i] = byteCharacters.charCodeAt(i);
        }

        return new Blob([byteArrays], { type: contentType });
    };

    const playAudio = () => {
        const base64Audio = localStorage.getItem('audio');
        if (base64Audio) {
            const blob = dataURLToBlob(base64Audio);
            const audioURL = URL.createObjectURL(blob);
            if (audioRef.current) {
                audioRef.current.src = audioURL;
                audioRef.current.play();
            }
        } else {
            console.error('Audio is not ready yet.');
        }
    };

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                if (!localStorage.getItem('audio')) {
                    const response = await axios.get('https://media.vocaroo.com/mp3/1jSNptuNuLGn', {
                        responseType: 'blob',
                    });

                    const reader = new FileReader();
                    reader.readAsDataURL(response.data);
                    reader.onloadend = () => {
                        const base64Data = reader.result as string;
                        localStorage.setItem('audio', base64Data);
                        console.log('Audio saved to localStorage');
                        setPlayAudio(playAudio); // Set playAudio after the audio is fetched and stored
                    };
                } else {
                    setPlayAudio(playAudio); // If audio is already in localStorage, set playAudio immediately
                }
            } catch (error) {
                console.error('Error fetching audio:', error);
            }
        };

        fetchAudio();
    }, []);

    return <audio ref={audioRef} />;
};

export default AudioElement;
