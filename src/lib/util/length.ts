export default function length(str: string, wpm = 200) {
  return `${Math.ceil(str.split(" ").length / wpm)} min read`;
}
