import City from '../models/city';

export function capabilities(str: string):string{
    return `${str[0].toUpperCase()}${str.slice(1)}`
}

export function colorGender(val: string){
    let color: string = "red";
    if(val === 'Male') color = "green";
    return(
        <span style={{color: color}}>{val}</span>
    )
}

export function colorMark(val: number){
    let color: string = "#ff3d00";
    if(val >= 8) color = '#00a152';
    else color = '#ff9800';
    return(
        <span style={{color: color}}>{val}</span>
    )
}

export function formatCity(cities:City[], val: string): string{
    for(let i = 0; i < cities.length; i++){
        if(cities[i].code === val) return cities[i].name;
    }
    return "";
}