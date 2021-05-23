// create function to get the data
function getData(id) {
    // Reade JSON
    d3.json("data/samples.json").then((data) => {
        let metadata = data.metadata;
        let resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        let result = resultsarray[0]
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

