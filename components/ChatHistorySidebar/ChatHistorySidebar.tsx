"use client";

import type {ComponentProps} from "react";

import React from "react";
import {
  Avatar,
  Button,
  ScrollShadow,
  Listbox,
  ListboxItem,
  ListboxSection,
  Spacer,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  cn,
} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import SidebarDrawer from "./SidebarDrawer";
import { Chat } from "@/types/chat";
import { useRouter } from "next/navigation";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */

function RecentPromptDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Icon
          className="text-default-500 opacity-0 group-hover:opacity-100"
          icon="solar:menu-dots-bold"
          width={24}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with icons" className="py-2" variant="faded">
        <DropdownItem
          key="share"
          className="text-default-500 data-[hover=true]:text-default-500"
          startContent={
            <Icon
              className="text-default-300"
              height={20}
              icon="solar:square-share-line-linear"
              width={20}
            />
          }
        >
          Share
        </DropdownItem>
        <DropdownItem
          key="rename"
          className="text-default-500 data-[hover=true]:text-default-500"
          startContent={
            <Icon className="text-default-300" height={20} icon="solar:pen-linear" width={20} />
          }
        >
          Rename
        </DropdownItem>
        <DropdownItem
          key="archive"
          className="text-default-500 data-[hover=true]:text-default-500"
          startContent={
            <Icon
              className="text-default-300"
              height={20}
              icon="solar:folder-open-linear"
              width={20}
            />
          }
        >
          Archive
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger-500 data-[hover=true]:text-danger-500"
          color="danger"
          startContent={
            <Icon
              className="text-danger-500"
              height={20}
              icon="solar:trash-bin-minimalistic-linear"
              width={20}
            />
          }
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default function ChatHistorySidebar({
  children,
  header,
  title,
  subTitle,
  classNames = {},
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  subTitle?: string;
  classNames?: Record<string, string>;
}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [chats, setChats] = React.useState<Chat[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchChats = async () => {
        const response = await fetch('http://localhost:9000/api/chats',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const results = await response.json();

        const chats: Chat[] = results.chats.map((item: any) => ({
            chat_id: item.id,
            conversation_history: item.conversation_history,
            description: item.description,
        }));

        setChats(chats);
    };

    fetchChats().catch(console.error);

  },[]);

  const content = (
    <div className="relative flex h-full w-72 flex-1 flex-col p-6 bg-amber-50">
      <div className="flex items-center gap-2 px-2 bg-amber-50">
        <span className="text-base font-bold uppercase leading-6 text-slate-500">Cat Chatter</span>
      </div>

      <Spacer y={8} />

      {/* <div className="flex flex-col gap-4 bg-content3">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              fullWidth
              className="h-[60px] justify-start gap-3 rounded-[14px] border-1 border-default-300 bg-transparent px-3 py-[10px]"
              endContent={<AvatarDropdownIcon height={20} width={20} />}
            >
              <div className="flex w-full items-center gap-3">
                <Avatar
                  size="sm"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/3a906b3de8eaa53e14582edf5c918b5d.jpg"
                />
                <div className="flex flex-col text-left">
                  <p className="text-small font-semibold leading-5 text-foreground">Taylor Smith</p>
                  <p className="text-tiny text-default-400">taylor@mail.com</p>
                </div>
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            className="w-[210px] bg-content1 px-[8px] py-[8px]"
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14">
              <div className="flex w-full items-center gap-3">
                <Avatar
                  size="sm"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/3a906b3de8eaa53e14582edf5c918b5d.jpg"
                />
                <div className="flex flex-col text-left">
                  <p className="text-small font-normal leading-5 text-foreground">Taylor Smith</p>
                  <p className="text-tiny text-default-400">taylor@mail.com</p>
                </div>
              </div>
            </DropdownItem>
            <DropdownSection showDivider aria-label="profile-section-1" className="px-0">
              <DropdownItem key="my-plan" className="py-[4px] text-default-500">
                My Plan
              </DropdownItem>
              <DropdownItem key="my-gpts" className="py-[4px] text-default-500">
                My GPTs
              </DropdownItem>
              <DropdownItem key="customize-acmeai" className="py-[4px] text-default-500">
                Customize AcmeAI
              </DropdownItem>
            </DropdownSection>
            <DropdownSection showDivider aria-label="profile-section-2">
              <DropdownItem key="settings" className="py-[4px] text-default-500">
                Settings
              </DropdownItem>
              <DropdownItem key="download-desktop-app" className="py-[4px] text-default-500">
                Download Desktop App
              </DropdownItem>
            </DropdownSection>
            <DropdownSection aria-label="profile-section-3" className="mb-0">
              <DropdownItem key="help-and-feedback" className="py-[4px] text-default-500">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" className="pt-[4px] text-default-500">
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div> */}

      <ScrollShadow className="-mr-6 h-full max-h-full pr-6 bg-amber-50">
        <Button
          fullWidth
          className="mb-6 mt-2 h-[44px] justify-start gap-3 bg-amber-50 hover:bg-amber-100 text-slate-900 px-3 py-[10px]"
          startContent={
            <Icon className="text-amber-900" icon="solar:chat-round-dots-linear" width={24} />
          }
          onPress={() => router.push('/chat')}
        >
          New Chat
        </Button>

        <Listbox aria-label="Recent chats" variant="flat">
          <ListboxSection
            classNames={{
              base: "py-0",
              heading: "py-0 pl-[10px] text-small text-default-400",
            }}
            title="Recent"
          >
            {
                chats.map((chat: Chat) => {
                    return (
                        <ListboxItem key={chat.chat_id} className="group h-[44px] px-[12px] py-[10px] text-slate-500" endContent={<RecentPromptDropdown/>} href={`/chat/${chat.chat_id}`}>
                            {chat.description}
                        </ListboxItem>
                    )
                })
            }
          </ListboxSection>
        </Listbox>
      </ScrollShadow>

      <Spacer y={8} />

      <div className="mt-auto flex flex-col">
        <Button
          fullWidth
          className="justify-start text-default-600"
          startContent={
            <Icon className="text-default-600" icon="solar:info-circle-line-duotone" width={24} />
          }
          variant="light"
        >
          Help
        </Button>
        <Button
          className="justify-start text-default-600"
          startContent={
            <Icon className="text-default-600" icon="solar:history-line-duotone" width={24} />
          }
          variant="light"
        >
          Activity
        </Button>

        <Button
          className="justify-start text-default-600"
          startContent={
            <Icon
              className="text-default-600"
              icon="solar:settings-minimalistic-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Settings
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row h-full min-h-[48rem] w-full bg-[#fdf6ec]">
      <SidebarDrawer
        className="h-full flex-none rounded-[14px] bg-[#fdf6ec]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
        <Button isIconOnly className="flex sm:hidden items-center justify-center border border-solid rounded-full left-4" size="sm" variant="light" onPress={onOpen}>
            <Icon
                className="text-default-500"
                height={24}
                icon="solar:hamburger-menu-outline"
                width={24}
            />
        </Button>
      {/* <div className="flex w-full flex-col px-4 sm:max-w-[calc(100%_-_288px)] bg-[#fdf6ec]">
        <header
          className={cn(
            "flex h-16 min-h-16 items-center justify-between gap-2 rounded-none rounded-t-medium border-small border-divider px-4 py-3",
            classNames?.["header"],
          )}
        >
          {(title || subTitle) && (
            <div className="w-full min-w-[120px] sm:w-auto">
              <div className="truncate text-small font-semibold leading-5 text-foreground">
                {title}
              </div>
              <div className="truncate text-small font-normal leading-5 text-default-500">
                {subTitle}
              </div>
            </div>
          )}
          {header}
        </header>
        <main className="flex h-full">
          <div className="flex h-full w-full flex-col gap-4 rounded-none rounded-b-medium border-0 border-b border-l border-r border-divider py-3">
            {children}
          </div>
        </main>
      </div> */}
    </div>
  );
}
