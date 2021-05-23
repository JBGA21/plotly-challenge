// create function to get the data
function getData(sample) {
    d3.json("data/samples.json").then((data) => {
        console.log(data)
        let metadata = data.metadata;
        let resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        let result = resultsarray[0]
        let panel = d3.select("#sample-metadata");
        panel.html("");




    })
}