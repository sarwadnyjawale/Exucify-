document.getElementById("situation").addEventListener("change", () => {
  const situation = document.getElementById("situation").value;
  document.getElementById("customSituation").style.display = situation === "custom" ? "block" : "none";
});

async function generateExcuse() {
  const situationDropdown = document.getElementById("situation");
  const style = document.getElementById("style").value;
  let situation = situationDropdown.value;

  if (situation === "custom") {
    situation = document.getElementById("customSituation").value;
    if (!situation.trim()) {
      alert("Please enter your custom situation.");
      return;
    }
  }

  const prompt = `Give me a ${style} excuse for the following situation: ${situation}`;

  document.getElementById("excuse").innerText = "⏳ Generating...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.9
      })
    });

    const data = await response.json();
    const excuse = data.choices[0].message.content;
    document.getElementById("excuse").innerText = excuse;
  } catch (error) {
    document.getElementById("excuse").innerText = "⚠️ Oops! Something went wrong.";
    console.error(error);
  }
}
