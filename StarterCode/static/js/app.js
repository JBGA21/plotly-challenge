// create function to get the data
function getData(sample) {
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

function buildCharts(sample) {
    d3.json("data/samples.json").then((data) => {
        let samples = data.samples;
        let resultsarray = samples.filter(sampleobject =>
            sampleobject.id == sample);
        let result = resultsarray[0]
        let ids = result.otu_ids;
        let labels = result.otu_labels;
        let values = result.sample_values;

        // Create chart
        let layoutB = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest"
        };

        let dataB = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values
            }
        }];
        Plotly.newPlot("bubble", dataB, layoutB);

        let dataBar = [
            {
                y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x: values.slice(0, 10).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", dataBar, barLayout);
    });
}

function init() {
    let select = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) => {
        let sampleNames = data.names;
        sampleNames.forEach((sample) => {
            select.append("option").text(sample).property("value", sample);
        });



    });
}