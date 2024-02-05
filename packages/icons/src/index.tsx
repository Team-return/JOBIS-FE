import { ChevronBarDownIcon } from "./ChevronBarDownIcon";
import { Chevron } from "./Chevron";
import { Close } from "./Close";
import { DateIcon } from "./DateIcon";
import { Download } from "./Download";
import { EyesClose } from "./EyesClose";
import { EyesOpen } from "./EyesOpen";
import { FileEarmarkArrowDownIcon } from "./FileEarmarkArrowDownIcon";
import { FileEarmarkPlusIcon } from "./FileEarmarkPlusIcon";
import { Logout } from "./Logout";
import { Plus } from "./Plus";
import { SearchIcon } from "./SearchIcon";
import { ToastSuccess } from "./ToastSuccess";
import { UploadIcon } from "./UploadIcon";
import { Trash } from "./Trash";
import { MyPg } from "./MyPg";
import { EditPencil } from "./EditPencil";
import { KebabMenu } from "./KebabMenu";
import { BookmarkOn } from "./BookmarkOn";
import { BookmarkOff } from "./BookmarkOff";
import { Document } from "./Document";
import { Check } from "./Check";

// Icon paths
export const icons = {
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
