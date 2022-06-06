const DATA = {
  "1": ["windows", "server"],
  "2": ["crystalzoom"],
  "3": ["python", "crystalzoom", "linux"],
  "4": ["crystalzoom"],
  "7": ["java", "crystalzoom", "cpp", "js"],
  "9": ["crystalzoom"],
  "10": ["ruby", "rails"]
};

const DATA_2 = {
  "1": ["windows", "server"],
  "2": ["crystalzoom"],
  "3": ["python", "crystalzoom", "linux"],
  "4": ["crystalzoom"],
  "7": ["java", "crystalzoom", "cpp", "js"],
  "9": ["crystalzoom"],
  "10": ["ruby", "rails"],
  "13": ["python", "crystalzoom", "linux"],
  "14": ["crystalzoom"],
  "15": ["java", "crystalzoom", "cpp", "js"],
  "16": ["crystalzoom"],
};

const KEYWORD = "crystalzoom";

const hasKeyword = (array) => array?.some(word => word === KEYWORD);

const updateKeyword = ({data, key, count}) => {
  const updatedSequence = data[key].map( 
    word => ( word !== KEYWORD ) ? word : KEYWORD?.concat(count)
  );

  return {...data, [key]: [...updatedSequence] }
};

const removeKeyword = (array) => array.filter( word => word !== KEYWORD);

const checkIfContiguous = ({key, nextKey}) => ((key + 1) === nextKey ); 


const deletions = function( data ){
  const keys = Object.keys(data);
  let dataCopy = {...data};

  for(let index=0; index<keys.length; index++){
    const key = keys[index];

    if( hasKeyword(dataCopy[key]) ){
      let counter = 1;
      let nextKey = Number(keys[index + counter]);
      let areContiguous = checkIfContiguous({key:Number(key), nextKey});

      while( hasKeyword(dataCopy[nextKey]) && areContiguous ) {
        dataCopy = {
          ...dataCopy,
          [nextKey]: removeKeyword(dataCopy[nextKey]),
        }

        if(!dataCopy[nextKey]?.length) delete dataCopy[nextKey];

        areContiguous = checkIfContiguous({
          key:Number(keys[index+counter]),
          nextKey: Number(keys[index+counter+1]),
        });        

        nextKey = Number(keys[index+counter+1]);
        counter += 1;
      };  //while

      dataCopy = updateKeyword({
        data:dataCopy,
        key: keys[index],
        count: counter
      });
    }
  }

  return dataCopy;
};

const result = deletions(DATA);

console.log('=====> RESULT: ', result);

const result_2 = deletions(DATA_2);

console.log('=====> RESULT 2: ', result_2);