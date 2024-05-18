// src/components/CanvasEditor.js
import React, { useRef, useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { drawCanvas } from '../utils/canvasUtils';

const templateData = {
  caption: {
    text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
    position: { x: 50, y: 50 },
    max_characters_per_line: 31,
    font_size: 44,
    alignment: "left",
    text_color: "#FFFFFF"
  },
  cta: {
    text: "Shop Now",
    position: { x: 190, y: 320 },
    text_color: "#FFFFFF",
    background_color: "#000000"
  },
  image_mask: { x: 56, y: 442, width: 970, height: 600 },
  urls: {
    mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
    stroke: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
    design_pattern: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png"
  }
};

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [captionText, setCaptionText] = useState(templateData.caption.text);
  const [ctaText, setCtaText] = useState(templateData.cta.text);
  const [backgroundColor, setBackgroundColor] = useState('#0369A1');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawCanvas(context, templateData, captionText, ctaText, backgroundColor);
  }, [captionText, ctaText, backgroundColor]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start">
        <div className="w-1/2">
          <canvas ref={canvasRef} width="1080" height="1080" className="border-2" style={{ height: 400, width: 400 }} />
        </div>
        <div className="w-1/2 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Caption Text</label>
            <input
              type="text"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">CTA Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Background Color</label>
            <ChromePicker
              color={backgroundColor}
              onChangeComplete={(color) => setBackgroundColor(color.hex)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
