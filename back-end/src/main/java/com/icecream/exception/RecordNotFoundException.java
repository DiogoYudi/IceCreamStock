package com.icecream.exception;

public class RecordNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public RecordNotFoundException(Long id){
        super("Não há nenhum produto com o este id: " + id);
    }
}
