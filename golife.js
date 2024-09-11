const canvas = document.querySelector("canvas");

if (!navigator.gpu) {
  throw new Error("WebGPU not supported");
}
