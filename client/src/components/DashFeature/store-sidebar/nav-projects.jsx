// import { Folder, MoreHorizontal, Share, Trash2 } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"

// export function NavProjects({
//   projects
// }) {
//   const { isMobile } = useSidebar()

//   return (
//     (<SidebarGroup className="group-data-[collapsible=icon]:visible">
//       <SidebarGroupLabel>Projects</SidebarGroupLabel>
//       <SidebarMenu>
//         {projects.map((item) => (
//           <SidebarMenuItem key={item.name}>
//             <SidebarMenuButton asChild>
//               <a href={item.url}>
//                 <item.icon />
//                 <span>{item.name}</span>
//               </a>
//             </SidebarMenuButton>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuAction showOnHover>
//                   <MoreHorizontal />
//                   <span className="sr-only">More</span>
//                 </SidebarMenuAction>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 className="w-48"
//                 side={isMobile ? "bottom" : "right"}
//                 align={isMobile ? "end" : "start"}>
//                 <DropdownMenuItem>
//                   <Folder className="text-muted-foreground" />
//                   <span>View Project</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Share className="text-muted-foreground" />
//                   <span>Share Project</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <Trash2 className="text-muted-foreground" />
//                   <span>Delete Project</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         ))}
//         <SidebarMenuItem>
//           <SidebarMenuButton>
//             <MoreHorizontal />
//             <span>More</span>
//           </SidebarMenuButton>
//         </SidebarMenuItem>
//       </SidebarMenu>
//     </SidebarGroup>)
//   );
// }

// // import * as React from "react"

// // import {
// //   SidebarGroup,
// //   SidebarGroupContent,
// //   SidebarMenu,
// //   SidebarMenuButton,
// //   SidebarMenuItem,
// // } from "@/components/ui/sidebar"

// // export function NavSecondary({
// //   items,
// //   ...props
// // }) {
// //   return (
// //     (<SidebarGroup {...props}>
// //       <SidebarGroupContent>
// //         <SidebarMenu>
// //           {items.map((item) => (
// //             <SidebarMenuItem key={item.title}>
// //               <SidebarMenuButton asChild size="sm">
// //                 <a href={item.url}>
// //                   <item.icon />
// //                   <span>{item.title}</span>
// //                 </a>
// //               </SidebarMenuButton>
// //             </SidebarMenuItem>
// //           ))}
// //         </SidebarMenu>
// //       </SidebarGroupContent>
// //     </SidebarGroup>)
// //   );
// // }


// // "use client"

// // import { ChevronRight } from "lucide-react";

// // import {
// //   Collapsible,
// //   CollapsibleContent,
// //   CollapsibleTrigger,
// // } from "@/components/ui/collapsible"

// // import {
// //   SidebarGroup,
// //   SidebarGroupLabel,
// //   SidebarMenu,
// //   SidebarMenuAction,
// //   SidebarMenuButton,
// //   SidebarMenuItem,
// //   SidebarMenuSub,
// //   SidebarMenuSubButton,
// //   SidebarMenuSubItem,
// // } from "@/components/ui/sidebar"

// // export function NavMain({
// //   items
// // }) {
// //   return (
// //     (<SidebarGroup>
// //       <SidebarGroupLabel>Platform</SidebarGroupLabel>
// //       <SidebarMenu>
// //         {items.map((item) => (
// //           <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
// //             <SidebarMenuItem>
// //               <SidebarMenuButton asChild tooltip={item.title}>
// //                 <a href={item.url}>
// //                   <item.icon />
// //                   <span>{item.title}</span>
// //                 </a>
// //               </SidebarMenuButton>
// //               {item.items?.length ? (
// //                 <>
// //                   <CollapsibleTrigger asChild>
// //                     <SidebarMenuAction className="data-[state=open]:rotate-90">
// //                       <ChevronRight />
// //                       <span className="sr-only">Toggle</span>
// //                     </SidebarMenuAction>
// //                   </CollapsibleTrigger>
// //                   <CollapsibleContent>
// //                     <SidebarMenuSub>
// //                       {item.items?.map((subItem) => (
// //                         <SidebarMenuSubItem key={subItem.title}>
// //                           <SidebarMenuSubButton asChild>
// //                             <a href={subItem.url}>
// //                               <span>{subItem.title}</span>
// //                             </a>
// //                           </SidebarMenuSubButton>
// //                         </SidebarMenuSubItem>
// //                       ))}
// //                     </SidebarMenuSub>
// //                   </CollapsibleContent>
// //                 </>
// //               ) : null}
// //             </SidebarMenuItem>
// //           </Collapsible>
// //         ))}
// //       </SidebarMenu>
// //     </SidebarGroup>)
// //   );
// // }

