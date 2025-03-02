
// Erzwingt das Neuladen von index.html bei Änderung
fetch("index.html", { cache: "reload" }).then(() => location.reload(true));
