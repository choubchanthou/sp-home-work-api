USE [master]
GO

IF DB_ID('sp_app') IS NOT NULL
  set noexec on               

CREATE DATABASE [sp_app];