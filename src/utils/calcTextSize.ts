export default function calcTextSize(text: string, textStyle: string, unit: "px" | "rem"): number {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    
    ctx.font = textStyle;
    const size = ctx.measureText(text).width;

    if(unit === "rem") {
        return size / 16;
    }
    
    return size;
}