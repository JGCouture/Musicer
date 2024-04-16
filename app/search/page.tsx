import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface searchProps{
    searchParams:{
        title:string;
    }
}

const Search = async ({searchParams}:searchProps) => {

    const songs = await getSongsByTitle(searchParams.title)

    return (
        <div>
            <Header>


                Search

                <SearchInput />

                <SearchContent songs={songs} />

            </Header>
      
        </div>
    )



}

export default Search;