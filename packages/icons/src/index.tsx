import { ChevronBarDownIcon } from "./chevronBarDownIcon";
import { Chevron } from "./chevron";
import { Close } from "./close";
import { DateIcon } from "./dateIcon";
import { Download } from "./download";
import { EyesClose } from "./eyesClose";
import { EyesOpen } from "./eyesOpen";
import { FileEarmarkArrowDownIcon } from "./fileEarmarkArrowDownIcon";
import { FileEarmarkPlusIcon } from "./fileEarmarkPlusIcon";
import { Logout } from "./logout";
import { Plus } from "./plus";
import { SearchIcon } from "./searchIcon";
import { ToastSuccess } from "./toastSuccess";
import { UploadIcon } from "./uploadIcon";
import { Trash } from "./trash";
import { MyPg } from "./myPg";
import { EditPencil } from "./editPencil";
import { KebabMenu } from "./kebabMenu";
import { BookmarkOn } from "./bookmarkOn";
import { BookmarkOff } from "./bookmarkOff";
import { Document } from "./document";
import { Check } from "./check";
import { ToastError } from "./toastError";
import { ToastWarning } from "./toastWarning";
import { ToastMessage } from "./toastMessage";

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
  ToastError: <ToastError />,
  ToastWarning: <ToastWarning />,
  ToastMessage: <ToastMessage />,
  Trash: <Trash />,
  Upload: <UploadIcon />,
} as const;
