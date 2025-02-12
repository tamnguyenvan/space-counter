'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cloud, Heart } from 'lucide-react';

const SpaceHighlighter = () => {
  const [text, setText] = useState('');
  
  const segments = text.split('').map((char, index) => ({
    char,
    isSpace: char === ' ',
    id: index
  }));

  const spaceCount = segments.filter(s => s.isSpace).length;
  const words = text.trim().split(/\s+/);
  const wordCount = text.trim() ? words.length : 0;
  const spacePercentage = wordCount ? ((spaceCount / (spaceCount + wordCount)) * 100).toFixed(1) : 0;

  const getSpaceColor = (index: number) => {
    const colors = [
      'bg-rose-100',
      'bg-violet-100',
      'bg-sky-100',
      'bg-teal-100',
      'bg-amber-100'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Space Counter
        </h1>
        <p className="text-lg text-slate-600">
          Discover the hidden rhythm in your words
        </p>
      </div>

      <Card className="bg-gradient-to-br from-slate-50 to-rose-50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2 text-slate-700">
          </CardTitle>
          <div className="flex justify-center gap-6 text-sm text-slate-500">
            <span>{spaceCount} spaces</span>
            <span>{wordCount} words</span>
            <span>{spacePercentage}% spaces</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Larger Input Area */}
          <ScrollArea className="h-48 rounded-lg border-2 border-slate-200">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your text here, and watch the spaces bloom..."
              className="w-full h-full p-4 focus:outline-none text-slate-600 placeholder:text-slate-400 resize-none bg-transparent"
            />
          </ScrollArea>

          {/* Scrollable Output Area */}
          <ScrollArea className="h-64 rounded-lg bg-white shadow-sm">
            <div className="p-6 leading-relaxed">
              <div className="flex flex-wrap gap-[1px]">
                {segments.map((segment, index) => (
                  <span
                    key={segment.id}
                    className={`${
                      segment.isSpace 
                        ? `${getSpaceColor(index)} px-1 rounded-md transition-all duration-300 hover:scale-110` 
                        : 'text-slate-600'
                    } text-lg font-medium`}
                  >
                    {segment.char}
                  </span>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* Space distribution visualization */}
          <div className="flex justify-center gap-1 h-8">
            {segments.filter(s => s.isSpace).map((_, index) => (
              <div
                key={index}
                className={`w-1 rounded-full transition-all duration-500 ${getSpaceColor(index)}`}
                style={{
                  height: '100%',
                  transform: `scaleY(${0.5 + Math.sin(index * 0.5) * 0.5})`
                }}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-2 text-sm text-slate-400 pt-2 pb-4">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>for white space enthusiasts</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SpaceHighlighter;