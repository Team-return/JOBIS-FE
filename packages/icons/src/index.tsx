import { ChevronBarDownIcon } from './chevronBarDownIcons';
import { Chevron } from './chevrons';
import { Close } from './closes';
import { DateIcon } from './dateIcons';
import { Download } from './downloads';
import { EyesClose } from './eyesCloses';
import { EyesOpen } from './eyesOpens';
import { FileEarmarkArrowDownIcon } from './fileEarmarkArrowDownIcons';
import { FileEarmarkPlusIcon } from './fileEarmarkPlusIcons';
import { Logout } from './logouts';
import { Plus } from './pluss';
import { SearchIcon } from './searchIcons';
import { ToastSuccess } from './toastSuccesss';
import { UploadIcon } from './uploadIcons';
import { Trash } from './trashs';
import { MyPg } from './myPgs';
import { EditPencil } from './editPencils';
import { KebabMenu } from './kebabMenus';
import { BookmarkOn } from './bookmarkOns';
import { BookmarkOff } from './bookmarkOffs';
import { Document } from './documents';
import { Check } from './checks';

// Icon paths
export const Icons = {
    BookmarkOn: <BookmarkOn />,
    BookmarkOff: <BookmarkOff />,
    Check: <Check />,
    Chevron: <Chevron />,
    ChevronBarDown: <ChevronBarDownIcon />,
    Close: <Close />,
    Date: <DateIcon />,
    Document: <Document />,
    Download: <Download />,
    EditPencil: <EditPencil />,
    EyesClose: <EyesClose />,
    EyesOpen: <EyesOpen />,
    FileEarmarkArrowDown: <FileEarmarkArrowDownIcon />,
    FileEarmarkPlus: <FileEarmarkPlusIcon />,
    KebabMenu: <KebabMenu />,
    Logout: <Logout />,
    MyPg: <MyPg />,
    Plus: <Plus />,
    Search: <SearchIcon />,
    ToastSuccess: <ToastSuccess />,
    Trash: <Trash />,
    Upload: <UploadIcon />,
} as const;
