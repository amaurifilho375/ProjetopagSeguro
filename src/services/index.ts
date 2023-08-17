type User ={
    name: string;
    picture: string;
    location: string
}

export function getUsers(){
 var resultApi;

const filterData = (result: any) => {
    return result.map((user: any) =>({
         name: `${user.name.first} ${user.name.last}`,
         location: `${user.location.city} ${user.location.country}`,
         picture: user.picture.thumbnail
              
      }));
      
 }

    //useEffect(() => {
        async function getSearch(): Promise<User[]>{
            let resultPe
            try{
                const response = await fetch('https://randomuser.me/api?results=50&nat=br,us,mx,gb,nz,nl,ca');
                if(response.ok == true){
                    let data = await response.json();
                    console.log(data);
                    let result = data.results;
                    let resultSearch = filterData(result);
                    
                    resultPe = resultSearch
                    return result
                    
                }else {
                throw new Error("tente mais tarde, Algo deu errado!")
                }
            
            }catch(e){
            console.log(e)
            }
            return resultPe;
        }
         const pega = getSearch().then(pega=>pega)
          console.log('Jesus')
          console.log(pega)
     
    //},[])
       
    //return users
    //return resultApi
}

//export default getUsers;