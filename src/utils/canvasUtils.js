// src/utils/canvasUtils.js
export const drawCanvas = (context, templateData, captionText, ctaText, backgroundColor) => {
    context.clearRect(0, 0, 1080, 1080);
  
    // Draw background color
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 1080, 1080);
  
    // Draw design pattern
    const designPattern = new Image();
    designPattern.src = `${templateData.urls.design_pattern}?random=${Math.random()}`;
    designPattern.onload = () => {
      context.drawImage(designPattern, 0, 0, 1080, 1080);
  
      // Draw image mask
      const imageMask = new Image();
      imageMask.src = `${templateData.urls.mask}?random=${Math.random()}`;
      imageMask.onload = () => {
        context.drawImage(imageMask, templateData.image_mask.x, templateData.image_mask.y, templateData.image_mask.width, templateData.image_mask.height);
  
        // Draw mask stroke
        const maskStroke = new Image();
        maskStroke.src = `${templateData.urls.stroke}?random=${Math.random()}`;
        maskStroke.onload = () => {
          context.drawImage(maskStroke, templateData.image_mask.x, templateData.image_mask.y, templateData.image_mask.width, templateData.image_mask.height);
  
          // Draw caption text
          drawText(context, templateData.caption, captionText);
  
          // Draw CTA text
          drawCta(context, templateData.cta, ctaText);
        };
      };
    };
  };
  
  const drawText = (context, caption, text) => {
    context.fillStyle = caption.text_color;
    context.font = `${caption.font_size}px Arial`;
    context.textAlign = caption.alignment;
  
    let lines = [];
    let words = text.split(' ');
    let line = '';
  
    words.forEach((word) => {
      let testLine = line + word + ' ';
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
  
      if (testWidth > caption.max_characters_per_line && line.length > 0) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = testLine;
      }
    });
    lines.push(line);
  
    lines.forEach((line, index) => {
      context.fillText(line, caption.position.x, caption.position.y + (index * caption.font_size));
    });
  };
  
  const drawCta = (context, cta, text) => {
    context.fillStyle = cta.background_color;
    context.roundRect(cta.position.x - 24, cta.position.y - 30, context.measureText(text).width + 48, 60, 30).fill();
  
    context.fillStyle = cta.text_color;
    context.font = '30px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, cta.position.x + (context.measureText(text).width / 2), cta.position.y);
  };
  
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
  };
  