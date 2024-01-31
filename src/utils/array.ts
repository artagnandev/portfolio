export default function array(length: number) {
  return Array.from({ length }, (_: any, i: number) => i + 1)
}