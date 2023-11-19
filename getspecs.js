function Get(what) {
    return document.getElementById(what+"Span") //I love camelCase!
}

function VideoCardInfo() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
      return {
        error: "no webgl",
      };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? {
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    } : {
      error: "no WEBGL_debug_renderer_info",
    };
  }
  
Get("gpu").innerText = JSON.stringify(VideoCardInfo()).match(/(?<=ANGLE\ \()(.*)(?=\(0)/)[0].match(/(?<=\,)(.*)/)[0]

let os = "Unknown OS";
let userAgent = window.navigator.userAgent;
if (userAgent.indexOf("Win") != -1) os = "Windows";
if (userAgent.indexOf("Mac") != -1) os = "MacOS";
if (userAgent.indexOf("X11") != -1) os = "UNIX";
if (userAgent.indexOf("Linux") != -1) os = "Linux";
Get("os").innerText = os
Get("connect").innerText = JSON.stringify(navigator.getBattery())

if (navigator.getBattery()==navigator.getBattery()) {
Get("battery").innerText = "not applicable"
} else {
Get("battery").innerText = JSON.stringify(navigator.getBattery())
}

let workerList = [];

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
  let newWorker = {
    worker: new Worker("cpuworker.js"),
    inUse: false,
  };
  workerList.push(newWorker);
}