-- CreateTable
CREATE TABLE "post" (
    "post_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "root_post_id" TEXT,
    "parent_post_id" TEXT,

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "media_file" (
    "media_file_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "media_file_pkey" PRIMARY KEY ("media_file_id")
);

-- CreateTable
CREATE TABLE "follow_relation" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initiatorUserId" TEXT NOT NULL,
    "followedUserId" TEXT NOT NULL,

    CONSTRAINT "follow_relation_pkey" PRIMARY KEY ("initiatorUserId","followedUserId")
);

-- CreateTable
CREATE TABLE "block_relation" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initiatorUserId" TEXT NOT NULL,
    "blockedUserId" TEXT NOT NULL,

    CONSTRAINT "block_relation_pkey" PRIMARY KEY ("initiatorUserId","blockedUserId")
);

-- CreateTable
CREATE TABLE "post_like_relation" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initiatorUserId" TEXT NOT NULL,
    "likedPostId" TEXT NOT NULL,

    CONSTRAINT "post_like_relation_pkey" PRIMARY KEY ("initiatorUserId","likedPostId")
);

-- CreateTable
CREATE TABLE "post_bookmark_relation" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "initiatorUserId" TEXT NOT NULL,
    "bookmarkedPostId" TEXT NOT NULL,

    CONSTRAINT "post_bookmark_relation_pkey" PRIMARY KEY ("initiatorUserId","bookmarkedPostId")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified_on" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "profile" (
    "profile_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "website" TEXT,
    "image_url" TEXT,
    "image_provider_id" TEXT,
    "banner_url" TEXT,
    "banner_provider_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "verification_code" (
    "verification_code_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "verification_code_pkey" PRIMARY KEY ("verification_code_id")
);

-- CreateTable
CREATE TABLE "recovery_code" (
    "verification_code_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recovery_code_pkey" PRIMARY KEY ("verification_code_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_file_url_key" ON "media_file"("url");

-- CreateIndex
CREATE UNIQUE INDEX "media_file_provider_id_key" ON "media_file"("provider_id");

-- CreateIndex
CREATE INDEX "follow_relation_initiatorUserId_idx" ON "follow_relation"("initiatorUserId");

-- CreateIndex
CREATE INDEX "follow_relation_followedUserId_idx" ON "follow_relation"("followedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "follow_relation_initiatorUserId_followedUserId_key" ON "follow_relation"("initiatorUserId", "followedUserId");

-- CreateIndex
CREATE INDEX "block_relation_initiatorUserId_idx" ON "block_relation"("initiatorUserId");

-- CreateIndex
CREATE INDEX "block_relation_blockedUserId_idx" ON "block_relation"("blockedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "block_relation_initiatorUserId_blockedUserId_key" ON "block_relation"("initiatorUserId", "blockedUserId");

-- CreateIndex
CREATE INDEX "post_like_relation_initiatorUserId_idx" ON "post_like_relation"("initiatorUserId");

-- CreateIndex
CREATE INDEX "post_like_relation_likedPostId_idx" ON "post_like_relation"("likedPostId");

-- CreateIndex
CREATE UNIQUE INDEX "post_like_relation_initiatorUserId_likedPostId_key" ON "post_like_relation"("initiatorUserId", "likedPostId");

-- CreateIndex
CREATE INDEX "post_bookmark_relation_initiatorUserId_idx" ON "post_bookmark_relation"("initiatorUserId");

-- CreateIndex
CREATE INDEX "post_bookmark_relation_bookmarkedPostId_idx" ON "post_bookmark_relation"("bookmarkedPostId");

-- CreateIndex
CREATE UNIQUE INDEX "post_bookmark_relation_initiatorUserId_bookmarkedPostId_key" ON "post_bookmark_relation"("initiatorUserId", "bookmarkedPostId");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_image_url_key" ON "profile"("image_url");

-- CreateIndex
CREATE UNIQUE INDEX "profile_image_provider_id_key" ON "profile"("image_provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_banner_url_key" ON "profile"("banner_url");

-- CreateIndex
CREATE UNIQUE INDEX "profile_banner_provider_id_key" ON "profile"("banner_provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_code_user_id_key" ON "verification_code"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "recovery_code_user_id_key" ON "recovery_code"("user_id");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_root_post_id_fkey" FOREIGN KEY ("root_post_id") REFERENCES "post"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_parent_post_id_fkey" FOREIGN KEY ("parent_post_id") REFERENCES "post"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_file" ADD CONSTRAINT "media_file_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_relation" ADD CONSTRAINT "follow_relation_initiatorUserId_fkey" FOREIGN KEY ("initiatorUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_relation" ADD CONSTRAINT "follow_relation_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_relation" ADD CONSTRAINT "block_relation_initiatorUserId_fkey" FOREIGN KEY ("initiatorUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_relation" ADD CONSTRAINT "block_relation_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_like_relation" ADD CONSTRAINT "post_like_relation_initiatorUserId_fkey" FOREIGN KEY ("initiatorUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_like_relation" ADD CONSTRAINT "post_like_relation_likedPostId_fkey" FOREIGN KEY ("likedPostId") REFERENCES "post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_bookmark_relation" ADD CONSTRAINT "post_bookmark_relation_initiatorUserId_fkey" FOREIGN KEY ("initiatorUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_bookmark_relation" ADD CONSTRAINT "post_bookmark_relation_bookmarkedPostId_fkey" FOREIGN KEY ("bookmarkedPostId") REFERENCES "post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_code" ADD CONSTRAINT "verification_code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recovery_code" ADD CONSTRAINT "recovery_code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
