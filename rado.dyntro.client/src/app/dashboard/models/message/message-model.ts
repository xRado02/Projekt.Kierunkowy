import { Attachment } from "./attachment-model";

export interface Message {
  id: string;
  content: string;
  sentAt: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  attachments: Attachment[];
}
