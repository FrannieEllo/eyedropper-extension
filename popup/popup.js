const eyeDropper = new EyeDropper();

const hasSupport = () => (eyeDropper in window);

async function getColor() {
  var result = null;
  try {
    const eyeDropper = new EyeDropper();
    result = await eyeDropper.open();
  } catch (e) {
    console.error(e);
    document.getElementById("hex").innerHTML = e
  }

  if (result) {
    document.getElementById("mycolor").style.backgroundColor = result.sRGBHex;
    document.getElementById("hex").innerHTML = result.sRGBHex;
    await navigator.clipboard.writeText(result.sRGBHex);
    await navigator.clipboard.readText();
  }
}

document.addEventListener("click", getColor)

// Add an event listener to the color input that will run the
// saveColorAndSendMessage function whenever there is any human input
// You could use "input" instead of "change" here to send the message
// continually, but this will run into issues because it will try to set
// values in Chrome storage more times than the max number of times per minute

// This code will run when the popup is opened. It asks chrome storage to get
// the current value of "color"
chrome.storage.sync.get(["mycolor"], (result) => {
  // Console.log the result - remember to open your popup console to see this!
  console.log(result); // This will console.log { color: "#ffffff" } (or whatever the stored color was)
  // Set the value of the color input to whatever the stored color is
  result.sRGBHex = result
});

