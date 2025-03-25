"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import { ImageIcon, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    processFile(file)
  }

  const processFile = (file: File) => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB")
      return
    }

    setError(null)
    setIsUploading(true)

    // In a real app, you would upload the file to your server or a storage service
    // For this demo, we'll simulate an upload and use a data URL
    const reader = new FileReader()
    reader.onload = () => {
      onChange(reader.result as string)
      setIsUploading(false)
    }
    reader.onerror = () => {
      setError("Error reading file")
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onChange("")
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  // Common drag and drop props
  const dragProps = {
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  }

  return (
    <div className={cn("space-y-4", className)}>
      {value ? (
        <div
          className={cn(
            "relative aspect-video overflow-hidden rounded-md border",
            isDragging && "border-primary border-2 bg-primary/10",
          )}
          {...dragProps}
        >
          <Image
            src={value || "/placeholder.svg"}
            alt="Featured image"
            fill
            className={cn("object-cover", isDragging && "opacity-50")}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Xoá ảnh</span>
          </Button>

          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
              <Upload className="h-12 w-12 text-primary" />
              <span className="sr-only">Kéo và thả hình ảnh</span>
            </div>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-6",
            isDragging && "border-primary border-2 bg-primary/10",
          )}
          {...dragProps}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{isDragging ? "Drop your image here" : "Drag and drop an image"}</p>
            <p className="text-xs text-muted-foreground">hoặc click để tải file (tối đa 5MB)</p>
          </div>
          <Button
            type="button"
            className="cursor-pointer"
            variant="secondary"
            disabled={isUploading}
            onClick={handleUploadClick}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
            <Upload className="ml-2 h-4 w-4" />
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}

      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
        ref={fileInputRef}
      />
    </div>
  )
}

