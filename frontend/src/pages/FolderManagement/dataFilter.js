
const dataFilter = (data) => {
    const filteredData = [];

    data.forEach( (item) => {
        const innerArr = [];

        for(const [ key, value ] of Object.entries(item)){
            if(key === 'assignedTo'){
                // counter = counter + 1;
                innerArr.push(value.name)
                continue;
            }
            innerArr.push(value);
        }

        filteredData.push(innerArr);
    })
    return filteredData;
}

export default dataFilter;