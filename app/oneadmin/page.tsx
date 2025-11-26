"use client";

import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RichTextEditor from "@/components/rich-text-editor";
import { useState } from "react";

export default function OneAdminPage() {
  const [content, setContent] = useState("");
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="imageConfig">
        <TabsList>
          <TabsTrigger value="imageConfig">轮播管理</TabsTrigger>
          <TabsTrigger value="password">文章管理</TabsTrigger>
        </TabsList>
        <TabsContent value="imageConfig">
          <Card>
            <CardHeader>
              <CardTitle>轮播管理</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-imgUrl">imgUrl</Label>
                <Input id="tabs-demo-imgUrl" defaultValue="" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">content</Label>
                <Input id="tabs-demo-username" defaultValue="" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>文章管理</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">type</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="article">article</SelectItem>
                      <SelectItem value="question">question</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-title">title</Label>
                <Input id="tabs-demo-title" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-author">author</Label>
                <Input id="tabs-demo-author" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-content">content</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save article</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
