import { DBSchema, IDBPDatabase, openDB } from "idb";
import { useLogger } from "../utils/logger";
import { useEffect, useState } from "react";

const log = useLogger("database");

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export type TemplateSchema = {
  name: string;
  values: string;
  decks: string;
  structure: string;
}

interface BoardgameCompanionSchema extends DBSchema {
  templates: {
    key: string;
    value: TemplateSchema;
  };
}

const DATABASE_NAME = "boardgame-companion";
const STORE_TEMPLATES = "templates";
const DATABASE_REVISION = 1;

export enum ENTITY_STATUS {
  LOADING,
  NOT_FOUND,
  OK
}

export const initializeDatabase = async () => {
  log.debug("initialize database");
  const db = await openDB<BoardgameCompanionSchema>(DATABASE_NAME, DATABASE_REVISION, {
    upgrade (db) {
      log.debug("update structure..");

      if (!db.objectStoreNames.contains(STORE_TEMPLATES)) {
        log.debug("creating templates table");
        db.createObjectStore(STORE_TEMPLATES, { keyPath: 'name' });
      }
    }
  });

  const usingSize = formatBytes((await navigator.storage.estimate()).usage ?? 0);
  log.debug(`current size is ${usingSize}`)

  return db;
}

export const useTemplatesStore = () => {
  const [database, setDatabase] = useState<IDBPDatabase<BoardgameCompanionSchema>|null>(null);

  useEffect(() => {
    if (!database) {
      openDB<BoardgameCompanionSchema>(DATABASE_NAME).then((db) => {
        setDatabase(db);
      });
    }
  }, [database]);


  return {
    get: (id: string) => {
      if (!database) return undefined;
      return database.get(STORE_TEMPLATES, id);
    },
    getAllKeys: () => {
      if (!database) return [];
      return database.getAllKeys(STORE_TEMPLATES);
    },
    update: (data: TemplateSchema) => {
      if (!database) throw new Error("tempaltes store is not ready");
      database.put(STORE_TEMPLATES, data);
    }
  }
}