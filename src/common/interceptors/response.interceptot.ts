import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { map, Observable } from "rxjs"

export interface ApiResponse<T> {
    success: boolean
    code: number
    data: T
    error: null | Error
    message?: string | null
    timestamp: string
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {

        return next.handle().pipe(
            map((data) => ({
                success: true,
                code: context.switchToHttp().getResponse().statusCode,
                message: (data && (data as any).message) ? (data as any).message : 'Operation successful',
                data: data,
                error: null,
                timestamp: new Date().toISOString(),
            }))
        )
        
    }
}