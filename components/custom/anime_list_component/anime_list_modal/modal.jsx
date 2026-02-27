import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ModalEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_entries"
import { ModalCardEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_card_entries"
import { ModalAddAnime } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_anime"
import { ModalAddEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_entries"

export function Modal({ 
    isModalEntriesOpen, 
    handleCloseModalEntries, 
    isModalAddAnimeOpen, 
    handleCloseModalAddAnime,
    isModalAddEntriesOpen,
    handleCloseModalAddEntries, 
    handleOpenModalAddEntries,
    animeName,
    newSeries 
  }) 
{
  return (
    <div>
      <ModalEntries
        isOpen={isModalEntriesOpen}
        onClose={handleCloseModalEntries}
        handleOpenModalAddEntries={handleOpenModalAddEntries}
        animeName={animeName}
      >
        <ModalCardEntries >     
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead className="font-extrabold">Anime</TableHead>
                <TableHead className="font-extrabold"># of Episodes</TableHead>
                <TableHead className="font-extrabold">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Episode 1</TableCell>
                <TableCell>12</TableCell>
                <TableCell>TV</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Episode 2</TableCell>
                <TableCell>1</TableCell>
                <TableCell>OVA</TableCell>
              </TableRow>                     
            </TableBody>
          </Table>
        </ModalCardEntries>
      </ModalEntries>
      <ModalAddAnime
        isOpen={isModalAddAnimeOpen}
        onClose={handleCloseModalAddAnime}
        newSeries={newSeries}
      />
      <ModalAddEntries 
        isOpen={isModalAddEntriesOpen}
        onClose={handleCloseModalAddEntries}
      />
    </div>
  );
}