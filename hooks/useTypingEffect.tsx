import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(text: string, speed: number = 20) {
  const [displayedText, setDisplayedText] = useState('');
  const previousTextRef = useRef('');

  useEffect(() => {
    if (text === previousTextRef.current) return;

    let commonPrefixLength = 0;
    while (commonPrefixLength < previousTextRef.current.length && 
           commonPrefixLength < text.length && 
           previousTextRef.current[commonPrefixLength] === text[commonPrefixLength]) {
      commonPrefixLength++;
    }

    const newText = text.slice(commonPrefixLength);
    setDisplayedText(text.slice(0, commonPrefixLength));

    let i = 0;
    const timer = setInterval(() => {
      if (i < newText.length) {
        setDisplayedText(prevText => prevText + newText.slice(i, i + speed));
        i += speed;
      } else {
        clearInterval(timer);
        previousTextRef.current = text;
      }
    }, 16); // ~60 FPS

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayedText;
}

