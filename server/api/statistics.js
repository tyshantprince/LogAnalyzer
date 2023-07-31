import jwt from 'jsonwebtoken';
import { getter } from "../log_analyzer";

export default defineEventHandler((event) => {
    
    if (event.node.req.method === 'GET') {
        
      return getter();
    }
   
  });